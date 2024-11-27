import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Expense, ExpenseCriteria, ExpenseUpsertDto, Page } from '../../shared/domain';

@Injectable({ providedIn: 'root' })
export class ExpenseService {
  private readonly httpClient = inject(HttpClient);

  private readonly apiUrl = `${environment.backendUrl}/expenses`; // API URL für die Ausgaben

  // Read: Alle Ausgaben abrufen
  getExpenses = (criteria: ExpenseCriteria): Observable<Page<Expense>> =>
    this.httpClient.get<Page<Expense>>(this.apiUrl, { params: new HttpParams({ fromObject: { ...criteria } }) });

  // Create & Update: Eine Ausgabe erstellen oder aktualisieren
  upsertExpense = (expense: ExpenseUpsertDto): Observable<void> => this.httpClient.put<void>(this.apiUrl, expense);

  // Delete: Eine Ausgabe löschen
  deleteExpense = (id: string): Observable<void> => this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
}
