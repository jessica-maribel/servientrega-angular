import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ShipmentsService } from '../shipments.service';
import { ShipmentListItem } from '../../shared/models/shipment';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list-guides',
  templateUrl: './list-guides.component.html',
  styleUrls: ['./list-guides.component.scss']
})
export class ListGuidesComponent implements AfterViewInit {
  displayedColumns = ['shipment_id', 'status', 'active', 'created_at'];
  data = new MatTableDataSource<ShipmentListItem>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private api: ShipmentsService) {
    this.load();
  }

  ngAfterViewInit() { this.data.paginator = this.paginator; }

  load() {
    this.api.listShipments(true).subscribe(res => this.data.data = res);
  }
}
