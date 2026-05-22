import { Component, input, output } from '@angular/core';
import { PokemonDetail, PokemonListItem } from '../../models/pokemon';
import { PokemonService } from '../../services/pokemon';
import { inject } from '@angular/core';
import { TYPE_COLORS } from '../../constants/pokemon.constants';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  templateUrl: './pokemon-card.html',
})
export class PokemonCardComponent {
  item   = input.required<PokemonListItem>();
  select = output<number>();

  private svc = inject(PokemonService);

  get data(): PokemonDetail | undefined {
    return this.svc.detailsCache.get(this.item().id);
  }

  get sprite(): string {
    return this.data?.sprites.other['official-artwork'].front_default
        ?? this.data?.sprites.front_default ?? '';
  }

  get mainColor() {
    const type = this.data?.types[0].type.name ?? 'normal';
    return TYPE_COLORS[type] ?? TYPE_COLORS['normal'];
  }

  typeColor(typeName: string) {
    return TYPE_COLORS[typeName] ?? TYPE_COLORS['normal'];
  }

  padId(id: number) { return String(id).padStart(3, '0'); }
}