import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
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
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { DxDataGridComponent } from 'devextreme-angular';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';

@Component({
  selector: 'app-indicadores',
  templateUrl: './indicadores.component.html',
  styleUrls: ['./indicadores.component.scss']
})
export class IndicadoresComponent implements OnInit {
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent | undefined;
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
  popupVisibleEditLogrado: boolean = false;
  emailButtonOptions: any;
  closeButtonOptions: any;
  updateLogradoButtonOptions: any;
  updateLogradoCloseButtonOptions: any;
  positionOf: string = "";
  meta: Meta = new Meta;
  logradoEditado: Logrado = new Logrado;
  dataSource: any;
  eliminado: boolean = false;

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
        that.addMeta();
      }
    };
    this.closeButtonOptions = {
      text: "Cerrar",
      onClick: function (e: any) {
        that.popupVisible = false;
      }
    };

    this.updateLogradoButtonOptions = {
      icon: "edit",
      text: "Guardar",
      onClick: function (e: any) {
        notify({
          message: "Meta Actualizada",
          position: {
            my: "center top",
            at: "center top"
          }
        }, "success", 3000);
        that.updateMetaLogrado();
      }
    };
    this.updateLogradoCloseButtonOptions = {
      text: "Cerrar",
      onClick: function (e: any) {
        that.popupVisibleEditLogrado = false;
      }
    };

    this.dataSource = new DataSource({
      store: new ArrayStore({
        data: this.logrados,
        key: "id",
      })
    });

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
  porcentajeCumplimiento: number = 0;
  porcentajeLogrado: number = 0;
  porcentajeMeta: number = 0;
  showPopUpEditLogrado(data: any, logrado: Logrado): void {
    this.popupVisibleEditLogrado = true;
    this.meta.idCodigoIndiador = this.indicadorId;
    this.logradoEditado = logrado;
    this.porcentajeCumplimiento = Number(this.logradoEditado.porcentajeCumplimiento) / 100
    this.porcentajeLogrado = Number(this.logradoEditado.logrado1)
    this.porcentajeMeta = Number(this.logradoEditado.meta)
  }

  addMeta(): void {

    let meta = new Meta;
    meta.idAreaAgencia = this.gridBoxValue[0];
    if(meta.idAreaAgencia == undefined){
      notify({
        message: "Seleccione el area de la agencia",
        position: {
          my: "center top",
          at: "center top"
        }
      }, "warning", 3000);
      return;
    }
    meta.idCodigoIndiador = this.indicadorId;
    this.indicadoresServices.addMeta(meta).subscribe((resp: Meta) => {
      meta.idAreaAgencia = resp.idCodigoIndiador;
    });

    let logrado = new Logrado;
    logrado.idAreaAgencia = meta.idAreaAgencia;
    logrado.idCodigoIndiador = meta.idCodigoIndiador;
    logrado.logrado1 = "0";
    logrado.meta = "0";
    logrado.observacion = "Meta Iniciada";
    logrado.porcentajeCumplimiento = "0";

    this.indicadoresServices.addMetaLogrado(logrado).subscribe((resp: Logrado) => {
      this.getMetaLogrado(this.indicadorId);
    });

    this.popupVisible = false;
    notify({
      message: "Meta registrada",
      position: {
        my: "center top",
        at: "center top"
      }
    }, "success", 3000);
  }
  getMetaLogrado(indicadorId: Number) {
    this.indicadoresServices.getMetaLogrado(indicadorId).subscribe((resp: Meta) => {
      this.indicadores.find(x=>x.idCodigoIndiador == indicadorId)!.metaDto = resp;
    });
  }
  updateMeta(meta: Meta): void {
    this.indicadoresServices.updateMeta(meta).subscribe((resp: Meta) => {
      console.log(resp);
    });
  }
  mostrarDatosMeta : boolean = true;
  deleteMeta(meta: Meta): void {
    this.indicadoresServices.deleteMeta(meta).subscribe((resp: Meta) => {
      console.log(resp);
    });
    let logrado = new Logrado;
    logrado.idAreaAgencia = meta.idAreaAgencia;
    logrado.idCodigoIndiador = this.indicadorId;
    this.indicadoresServices.deleteMetaLogrado(logrado).subscribe((resp: Meta) => {
      console.log(resp);
      this.getMetaLogrado(this.indicadorId);
      this.eliminado = true;
      this.mostrarDatosMeta = false;
    });
    notify({
      message: "Meta eliminada",
      position: {
        my: "center top",
        at: "center top"
      }
    }, "success", 3000);
  }

  updateMetaLogrado(): void {
    this.indicadoresServices.updateMetaLogrado(this.logradoEditado).subscribe((resp: Indicador) => {
      console.log(resp);
    });
    this.popupVisibleEditLogrado = false;
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

  porcentajeCumplimientoChange(data: any): void {
    this.logradoEditado.porcentajeCumplimiento = String(data.value * 100);
  }

  logradoChange(data: any): void {
    this.logradoEditado.logrado1 = String(data.value);
    this.calcularCumplimiento();
  }

  calcularCumplimiento() {
    this.porcentajeCumplimiento = (Number(this.logradoEditado.logrado1) / Number(this.logradoEditado.meta));
  }

  metaChange(data: any): void {
    this.logradoEditado.meta = String(data.value);
    this.calcularCumplimiento();
  }

  customizeText(arg: any) {
    return arg.valueText + " %";
  }
  customizeTooltip(arg: any) {
    return {
      text: arg.valueText + " %"
    };
  }
  exportGrid() {
    const doc = new jsPDF();
    exportDataGridToPdf({
      jsPDFDocument: doc,
      component: this.dataGrid!.instance
    }).then(() => {
      doc.save('indicadores.pdf');
    })
  }

}
