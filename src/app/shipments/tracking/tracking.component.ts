import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ShipmentsService } from '../shipments.service';
import { Guia } from '../../shared/models/guia';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss']
})
export class TrackingComponent {
  result?: Guia;
  loading = false;

  form = this.fb.group({ id: ['', Validators.required] });

  constructor(private fb: FormBuilder, private api: ShipmentsService) {}

  search() {
    if (this.form.invalid) return;
    this.loading = true;
    this.api.getGuia(this.form.value.id!).subscribe({
      next: res => { this.result = res; this.loading = false; },
      error: () => { this.result = undefined; this.loading = false; }
    });
  }
}
