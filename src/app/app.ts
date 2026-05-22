import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PokemonService } from './services/pokemon';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card';
import { PokemonModalComponent } from './components/pokemon-modal/pokemon-modal';
import { PokemonDetail, PokemonListItem } from './models/pokemon';
import { GENERATIONS, PAGE_SIZE } from './constants/pokemon.constants';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, PokemonCardComponent, PokemonModalComponent],
  templateUrl: './app.html',
})
export class App implements OnInit {
  private svc = inject(PokemonService);

  allPokemon   = signal<PokemonListItem[]>([]);
  loading      = signal(true);
  search       = signal('');
  activeGen    = signal('all');
  activeType   = signal('all');
  currentPage  = signal(1);
  selectedId   = signal<number | null>(null);
  knownTypes   = signal<string[]>([]);

  readonly PAGE_SIZE = PAGE_SIZE;
  readonly GENERATIONS = GENERATIONS;

  filtered = computed(() => {
    const q   = this.search().toLowerCase().trim();
    const gen = GENERATIONS.find(g => g.gen === this.activeGen())!;
    let list  = this.allPokemon();

    if (gen.gen !== 'all')
      list = list.filter(p => p.id >= gen.start && p.id <= gen.end);

    if (q)
      list = list.filter(p => p.name.includes(q) || String(p.id).includes(q));

    if (this.activeType() !== 'all') {
      list = list.filter(p => {
        const d = this.svc.detailsCache.get(p.id);
        return d ? d.types.some(t => t.type.name === this.activeType()) : true;
      });
    }
    return list;
  });

  totalPages = computed(() =>
    Math.max(1, Math.ceil(this.filtered().length / PAGE_SIZE))
  );

  pageItems = computed(() => {
    const start = (this.currentPage() - 1) * PAGE_SIZE;
    return this.filtered().slice(start, start + PAGE_SIZE);
  });

  selectedPokemon = computed(() =>
    this.selectedId() != null
      ? this.svc.detailsCache.get(this.selectedId()!) ?? null
      : null
  );

  async ngOnInit() {
    const list = await this.svc.fetchAllList();
    this.allPokemon.set(list);
    await this.svc.loadDetails(list.slice(0, PAGE_SIZE));
    this.collectTypes();
    this.loading.set(false);
    await this.loadCurrentPage();

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') this.closeModal();
    });
  }

  async loadCurrentPage() {
    this.loading.set(true);
    await this.svc.loadDetails(this.pageItems());
    this.collectTypes();
    this.loading.set(false);
  }

  collectTypes() {
    const set = new Set<string>();
    this.svc.detailsCache.forEach(d => d.types.forEach(t => set.add(t.type.name)));
    this.knownTypes.set(Array.from(set).sort());
  }

  setGen(gen: string) { this.activeGen.set(gen);  this.currentPage.set(1); this.loadCurrentPage(); }
  setType(t: string)  { this.activeType.set(t);    this.currentPage.set(1); this.loadCurrentPage(); }
  onSearch(q: string) { this.search.set(q);         this.currentPage.set(1); this.loadCurrentPage(); }
  openModal(id: number) { this.selectedId.set(id); }
  closeModal()          { this.selectedId.set(null); }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages()) return;
    this.currentPage.set(page);
    this.loadCurrentPage();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getDetail(id: number): PokemonDetail | undefined {
    return this.svc.detailsCache.get(id);
  }
}