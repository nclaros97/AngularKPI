import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Indicador } from './models/indicadores';
import { IndicadoresServices } from './services/indicadoresServices';
import { SubObjetivo } from '../objetivos/models/subObjetivo';
import { variablesGenerales } from 'src/app/shared/variables/variables';
import { AgenciaService } from '../agencias/services/agencia.service';
import { AreaService } from '../areas/services/area.service';
import { AreaAgencia } from '../agencias/models/areaAgencia';
import CustomStore from 'devextreme/data/custom_store';
import { Meta } from './models/meta';
import { Estados } from './models/estado';
import { IndicadorLogrado } from './models/indicadorLogrado';
import notify from 'devextreme/ui/notify';
import { Logrado } from './models/logrado';

@Component({
  selector: 'app-indicadores',
  templateUrl: './indicadores.component.html',
  styleUrls: ['./indicadores.component.scss']
})
export class IndicadoresComponent implements OnInit {

  constructor(private indicadoresServices: IndicadoresServices, private router: Router, private ref: ChangeDetectorRef) { }

  indicadores: Indicador[] = [];
  tiempos: any[] = [];
  areasAgencias: AreaAgencia[] = [];
  gridDataSource: any;
  subObjetivos: SubObjetivo[] = [];
  textoEditarRowGrid: any = variablesGenerales.textoEditarRowGrid;
  indicadorId: number = 0;
  agregarMetas: boolean = true;
  gridBoxValue: number[] = [3];
  isGridBoxOpened: boolean = false;
  gridColumns: any = [
    {
      dataField: 'idAreaAgencia',
      caption: 'Código'
    },
    {
      dataField: 'areaDto.nombreArea',
      caption: 'Área'
    },
    {
      dataField: 'agenciaDto.nombreAgencia',
      caption: 'Agencia'
    }
  ];

  estados: Estados[] = [];
  logrados: IndicadorLogrado[] = [];
  popupVisible: boolean = false;
  emailButtonOptions: any;
  closeButtonOptions: any;
  positionOf: string = "";
  meta: Meta = new Meta;

  ngOnInit(): void {
    const that = this;
    this.meta as Meta;
    this.getIndicadores();
    this.getTiempos();
    this.getSubObjetivos();
    this.getAreasAgencias();
    this.isGridBoxOpened = false;
    this.estados = this.indicadoresServices.getEstados();
    this.logrados = this.indicadoresServices.getLogrados();

    this.emailButtonOptions = {
      icon: "add",
      text: "Agregar",
      onClick: function (e: any) {
        notify({
          message: "Meta registrada",
          position: {
            my: "center top",
            at: "center top"
          }
        }, "success", 3000);
        that.addMeta();
      }
    };
    this.closeButtonOptions = {
      text: "Close",
      onClick: function (e: any) {
        that.popupVisible = false;
      }
    };

  }

  getIndicadores(): void {
    this.indicadoresServices.getIndicadores().subscribe((resp: Indicador[]) => {
      this.indicadores = resp;
    });
  }

  getSubObjetivos(): void {
    this.indicadoresServices.getSubObjetivos().subscribe((resp: SubObjetivo[]) => {
      this.subObjetivos = resp;
    });
  }

  getTiempos(): void {
    this.indicadoresServices.getTiempos().subscribe((resp: any[]) => {
      this.tiempos = resp;
    });
  }

  getMetas(): void {
    this.indicadoresServices.getTiempos().subscribe((resp: any[]) => {
      this.tiempos = resp;
    });
  }

  getAreasAgencias(): void {
    this.indicadoresServices.getAreasAgencias().subscribe((resp: any[]) => {
      this.areasAgencias = resp;
      this.gridDataSource = this.makeDataSource(this.areasAgencias);
    });
  }

  makeDataSource(areasAgencias: any) {
    return new CustomStore({
      loadMode: "raw",
      key: "idAreaAgencia",
      load: function () {
        return areasAgencias;
      }
    });
  };

  addIndicador(indicador: Indicador): void {
    this.indicadoresServices.addIndicador(indicador).subscribe((resp: Indicador) => {
      indicador.idCodigoIndiador = resp.idCodigoIndiador;
    });
  }
  updateIndicador(indicador: Indicador): void {
    this.indicadoresServices.updateIndicador(indicador).subscribe((resp: Indicador) => {
      console.log(resp);
    });
  }

  editarIndicador: boolean = false;
  onEditingStart(event: Indicador): void {
    this.editarIndicador = true;
  }

  deleteIndicador(indicadorId: number): void {
    this.indicadoresServices.deleteIndicador(indicadorId).subscribe((resp: Indicador) => {
      console.log(resp);
    });
  }

  showPopUp(data: any): void {
    this.popupVisible = true;
    this.meta.idCodigoIndiador = this.indicadorId;
  }

  addMeta(): void {
    let meta = new Meta;
    meta.idAreaAgencia = this.gridBoxValue[0];
    meta.idCodigoIndiador = this.indicadorId;
    this.indicadoresServices.addMeta(meta).subscribe((resp: Meta) => {
      meta.idAreaAgencia = resp.idCodigoIndiador;
    });

    let logrado = new Logrado;
    logrado.idAreaAgencia = meta.idAreaAgencia;
    logrado.idCodigoIndiador = meta.idCodigoIndiador;
    logrado.logrado1 = "No";
    logrado.meta = "";
    logrado.observacion = "Meta Iniciada";
    logrado.porcentajeCumplimiento = "0";

    this.indicadoresServices.addMetaLogrado(logrado).subscribe((resp: Logrado)=>{

    });

    this.popupVisible = false;
  }
  updateMeta(meta: Meta): void {
    this.indicadoresServices.updateMeta(meta).subscribe((resp: Meta) => {
      console.log(resp);
    });
  }
  deleteMeta(meta: Meta): void {
    this.indicadoresServices.deleteMeta(meta).subscribe((resp: Meta) => {
      console.log(resp);
    });
  }

  contentReady(e: any): void {
    if (!e.component.getSelectedRowKeys().length)
      e.component.selectRowsByIndexes(0);
  }
  selectionChanged(e: any): void {
    e.component.collapseAll(-1);
    e.component.expandRow(e.currentSelectedRowKeys[0]);
    let currentIndicador = e.currentSelectedRowKeys[0] as Indicador;
    this.indicadorId = currentIndicador.idCodigoIndiador;
  }
  gridBox_displayExpr(e: any) {
    return e && "Área: " + e.areaDto.nombreArea + " || Agencia: " + e.agenciaDto.nombreAgencia;
  }

  onGridBoxOptionChanged(e: any) {
    if (e.name === "value") {
      this.isGridBoxOpened = false;
      this.ref.detectChanges();
    }
  }
  handleRowExpanding(event: Indicador): void {
    this.indicadorId = event.idCodigoIndiador;
  }

}
