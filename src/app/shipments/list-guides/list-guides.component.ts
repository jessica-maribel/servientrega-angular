import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ShipmentsService } from '../shipments.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Guia } from '../../shared/models/guia';

@Component({
  selector: 'app-list-guides',
  templateUrl: './list-guides.component.html',
  styleUrls: ['./list-guides.component.scss']
})
export class ListGuidesComponent implements AfterViewInit {
  displayedColumns = ['_id', 'estado', 'activo', 'fecha_creacion'];
  dataSource = new MatTableDataSource<Guia>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private api: ShipmentsService) {
    this.load();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  load() {
    this.api.listShipments(true).subscribe(res => {
      this.dataSource.data = res || [];
      if (this.paginator) this.dataSource.paginator = this.paginator;
    });
  }
}
