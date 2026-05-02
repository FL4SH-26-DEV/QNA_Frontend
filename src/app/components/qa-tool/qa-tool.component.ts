import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QaService } from '../../services/qa.service';
import { QAHistoryItem } from '../../models/qa.model';

@Component({
  selector: 'app-qa-tool',
  templateUrl: './qa-tool.component.html',
  styleUrls: ['./qa-tool.component.scss'],
})
export class QaToolComponent implements OnInit {
  qaForm!: FormGroup;
  answer: string | null = null;
  errorMessage: string | null = null;
  isLoading = false;
  history: QAHistoryItem[] = [];
  contextWordCount = 0;

  constructor(private fb: FormBuilder, private qaService: QaService) {}

  ngOnInit(): void {
    this.qaForm = this.fb.group({
      context: ['', [Validators.required, Validators.minLength(10)]],
      question: ['', [Validators.required, Validators.minLength(3)]],
    });

    // Track word count on context changes
    this.qaForm.get('context')?.valueChanges.subscribe((val: string) => {
      this.contextWordCount = val
        ? val.trim().split(/\s+/).filter(Boolean).length
        : 0;
    });
  }

  get contextControl() {
    return this.qaForm.get('context')!;
  }
  get questionControl() {
    return this.qaForm.get('question')!;
  }

  onSubmit(): void {
    if (this.qaForm.invalid || this.isLoading) return;

    this.isLoading = true;
    this.answer = null;
    this.errorMessage = null;

    const { context, question } = this.qaForm.value;

    this.qaService.ask(context, question).subscribe({
      next: (res) => {
        this.answer = res.answer;
        this.isLoading = false;

        // Add to history (newest first)
        this.history.unshift({
          question,
          answer: res.answer,
          timestamp: new Date(),
        });
      },
      error: (err: Error) => {
        this.errorMessage = err.message;
        this.isLoading = false;
      },
    });
  }

  clearContext(): void {
    this.qaForm.get('context')?.reset();
    this.answer = null;
    this.errorMessage = null;
    this.history = [];
  }

  clearAnswer(): void {
    this.answer = null;
    this.errorMessage = null;
    this.qaForm.get('question')?.reset();
  }

  useHistoryQuestion(item: QAHistoryItem): void {
    this.qaForm.get('question')?.setValue(item.question);
    this.answer = item.answer;
  }

  isNotFound(answer: string): boolean {
    return answer.toLowerCase().includes('not found');
  }
}
