import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-feature-placeholder-page',
  templateUrl: './feature-placeholder-page.component.html',
  styleUrl: './feature-placeholder-page.component.css',
})
export class FeaturePlaceholderPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly data = this.route.snapshot.data;

  readonly section = this.data['section'] as string | undefined;
  readonly title = this.data['title'] as string;
  readonly description = this.data['description'] as string;
  readonly nextStep = this.data['nextStep'] as string | undefined;
}
