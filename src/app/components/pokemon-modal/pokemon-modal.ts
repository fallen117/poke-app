import { Component, input, output } from '@angular/core';
import { PokemonDetail } from '../../models/pokemon';
import { TYPE_COLORS, STAT_NAMES, STAT_COLORS } from '../../constants/pokemon.constants';

@Component({
  selector: 'app-pokemon-modal',
  standalone: true,
  templateUrl: './pokemon-modal.html',
})
export class PokemonModalComponent {
  pokemon = input<PokemonDetail | null>(null);
  close   = output<void>();

  get sprite() {
    return this.pokemon()?.sprites.other['official-artwork'].front_default
        ?? this.pokemon()?.sprites.front_default ?? '';
  }

  typeColor(name: string) { return TYPE_COLORS[name] ?? TYPE_COLORS['normal']; }
  statName(key: string)   { return STAT_NAMES[key] ?? key; }
  statColor(i: number)    { return STAT_COLORS[i % STAT_COLORS.length]; }
  statPct(val: number)    { return Math.round((val / 255) * 100); }
  padId(id: number)       { return String(id).padStart(3, '0'); }

  onOverlayClick(e: MouseEvent) {
    if ((e.target as HTMLElement).classList.contains('overlay')) this.close.emit();
  }
}