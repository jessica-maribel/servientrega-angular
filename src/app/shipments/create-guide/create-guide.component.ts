import { Component } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ShipmentsService } from '../shipments.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-guide',
  templateUrl: './create-guide.component.html',
  styleUrls: ['./create-guide.component.scss']
})
export class CreateGuideComponent {
  loading = false;

  form = this.fb.group({
    remitente: this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      address_line: ['', Validators.required],
      city: ['', Validators.required],
      province: ['', Validators.required],
      country: ['EC', Validators.required],
      lat: [null],
      lng: [null]
    }),
    destinatario: this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      address_line: ['', Validators.required],
      city: ['', Validators.required],
      province: ['', Validators.required],
      country: ['EC', Validators.required],
      lat: [null],
      lng: [null]
    }),
    items: this.fb.array([
      this.fb.group({
        description: ['', Validators.required],
        qty: [1, [Validators.required, Validators.min(1)]],
        weight_kg: [0.5, [Validators.required, Validators.min(0.01)]],
        value_usd: [20]
      })
    ]),
    service: ['nacional_express', Validators.required],
    payment: this.fb.group({ method: ['prepaid', Validators.required], payer: ['sender', Validators.required] }),
    insurance: this.fb.group({ declared_value_usd: [20] })
  });

  get items() { return this.form.get('items') as FormArray; }

  constructor(private fb: FormBuilder, private api: ShipmentsService, private snack: MatSnackBar) {}

  addItem() {
    this.items.push(this.fb.group({
      description: ['', Validators.required],
      qty: [1, [Validators.required, Validators.min(1)]],
      weight_kg: [0.5, [Validators.required, Validators.min(0.01)]],
      value_usd: [0]
    }));
  }

  removeItem(i: number) { this.items.removeAt(i); }

  save() {
    if (this.form.invalid) return;
    this.loading = true;
    this.api.createShipment(this.form.value as any).subscribe({
      next: res => {
        this.loading = false;
        this.snack.open(`Guía creada: ${res._id}`, 'OK', { duration: 3000 });
      },
      error: e => { this.loading = false; this.snack.open(e?.error?.message || 'Error al crear guía', 'OK', { duration: 3000 }); }
    });
  }
} 
