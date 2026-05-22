import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { PokemonDetail, PokemonListItem } from '../models/pokemon';

@Injectable({ providedIn: 'root' })
export class PokemonService {
  private http = inject(HttpClient);
  private base = 'https://pokeapi.co/api/v2';

  // Caché compartido entre componentes (equivale a detailsCache del JS)
  detailsCache = new Map<number, PokemonDetail>();

  async fetchAllList(): Promise<PokemonListItem[]> {
    const data = await firstValueFrom(
      this.http.get<{ results: { name: string; url: string }[] }>(
        `${this.base}/pokemon?limit=1350&offset=0`
      )
    );
    return data.results.map(p => ({
      name: p.name,
      url: p.url,
      id: parseInt(p.url.split('/').filter(Boolean).pop()!),
    }));
  }

  async loadDetails(items: PokemonListItem[]): Promise<void> {
    const uncached = items.filter(p => !this.detailsCache.has(p.id));
    if (!uncached.length) return;

    // Carga en chunks de 10, igual que en tu JS original
    for (let i = 0; i < uncached.length; i += 10) {
      const chunk = uncached.slice(i, i + 10);
      const results = await Promise.all(
        chunk.map(p =>
          firstValueFrom(this.http.get<PokemonDetail>(p.url)).catch(() => null)
        )
      );
      results.forEach(d => { if (d) this.detailsCache.set(d.id, d); });
    }
  }
}