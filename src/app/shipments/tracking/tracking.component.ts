import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ShipmentsService } from '../shipments.service';
import { TrackingResponse } from '../../shared/models/tracking';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss']
})
export class TrackingComponent {
  result?: TrackingResponse;
  loading = false;

  form = this.fb.group({ id: ['', Validators.required] });

  constructor(private fb: FormBuilder, private api: ShipmentsService) {}

  search() {
    if (this.form.invalid) return;
    this.loading = true;
    this.api.getTracking(this.form.value.id!).subscribe({
      next: res => { this.result = res; this.loading = false; },
      error: () => { this.result = undefined; this.loading = false; }
    });
  }
}
