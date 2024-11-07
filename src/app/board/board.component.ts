import { Component } from '@angular/core';
import { SquareComponent } from '../square/square.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [SquareComponent, CommonModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {
  squares: ('X' | 'O' | '')[] = [];
  xIsNext: boolean = true;
  winner: 'X' | 'O' | '' = '';

  ngOnInit(): void {
    this.newGame();
    this.loadAgent();
  }

  newGame(): void {
    this.squares = Array(9).fill('');
    this.xIsNext = true;
    this.winner = '';
  }

  loadAgent(): void {
    // Load the agent
  }

  get player(): ('X' | 'O') {
    return this.xIsNext ? 'X' : 'O';
  }

  makeMove(idx: number): void {
    if (!this.squares[idx] && !this.winner) {
      this.squares.splice(idx, 1, this.player);
      this.xIsNext = !this.xIsNext;
      this.winner = this.calculateWinner();
    }
  }

  calculateWinner(): ('X' | 'O' | '') {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];
    for (const line of lines) {
      const [a, b, c] = line;
      if (this.squares[a] && this.squares[a] === this.squares[b] && this.squares[a] === this.squares[c]) {
        return this.squares[a];
      }
    }
    return '';
  }

}
