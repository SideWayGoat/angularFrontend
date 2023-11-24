import { Component } from '@angular/core';
import { PowerService } from '../power.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { PowerModel } from '../PowerModel';

@Component({
  selector: 'app-realtimedata',
  templateUrl: './realtimedata.component.html',
  styleUrls: ['./realtimedata.component.css']
})
export class RealtimedataComponent {
  title="Realtime Data"
  dataEl:PowerModel ={
    ActiveEnergyOutlet: 0,
    ActiveEnergyInput: 0,
    ReactiveEnergyOutlet: '',
    ReactiveEnergyInput: '',
    ActivePowerOutlet: '',
    ActivePowerInput: '',
    ReactivePowerOutlet: '',
    ReactivePowerInput: '',
    ActivePowerOutlet1:'',
    ActivePowerInput1: '',
    ActivePowerOutlet2:'',
    ActivePowerInput2: '',
    ActivePowerOutlet3:'',
    ActivePowerInput3: '',
    ReactivePowerOutlet1: '',
    ReactivePowerInput1: '',
    ReactivePowerOutlet2: '',
    ReactivePowerInput2: '',
    ReactivePowerOutlet3: '',
    ReactivePowerInput3: '',
    PhaseCurrent1: '',
    PhaseCurrent2: '',
    PhaseCurrent3: '',
    PhaseVoltage1: '',
    PhaseVoltage2: '',
    PhaseVoltage3: ''
    };
    History:any[] = [];
    Amp: any;
    Volt: any;
    KwH: any;
    KwHP1:any;
    KwHP2:any;
    KwHP3:any;
    PowerFactor: any;
    MaxKwH:any;
    inputKwH:any;
     
      constructor(private power: PowerService, private http: HttpClient, private snackBar:MatSnackBar) {}
     
      ngOnInit(){
        this.getNewData()
        this.Update()
      }
     
      Update(){
        const timeIntervalSeconds = 10000;
        setInterval(()=> { this.getNewData()}, timeIntervalSeconds);
        setInterval(() => {this.KwH = this.CalculateTotalKwh(),this.KwHP1 = this.CalculateKwhP1(), this.KwHP2 = this.CalculateKwHP2(), this.KwHP3 = this.CalculateKwHP3()}, timeIntervalSeconds);
        setInterval(() => {this.checkMaxKwH() },timeIntervalSeconds);
      }
     
    getNewData(){
      this.power.getData().subscribe(
          (data: PowerModel) => {
            this.dataEl = data;
      })
      this.AddNewHistory();
      console.log(this.MaxKwH)
    }
     
     
    // SaveHistoryToFile(){
    //   let exportData = this.History;
    //   return saveAs(new Blob([JSON.stringify(exportData, null, 2)], { type: 'JSON'}), 'History.json');
    // }
     
    CalculateTotalKwh(){
      const Amp1 = parseFloat(this.dataEl.PhaseCurrent1);
      const Amp2 = parseFloat(this.dataEl.PhaseCurrent2);
      const Amp3 = parseFloat(this.dataEl.PhaseCurrent3);
     
      const Amp = (Amp1 + Amp2 + Amp3) / 3;
     
      const Volt = parseFloat(this.dataEl.PhaseVoltage1);
      const PF = 0.85;
     
      const KwH = ((Amp * Volt * PF * 3) / 1000).toFixed(4);
     
      // console.log(KwH)
      return KwH;
    }
     
    CalculateKwhP1(){
      const Amp1 = parseFloat(this.dataEl.PhaseCurrent1);
     
      const Volt = parseFloat(this.dataEl.PhaseVoltage1);
      const PF = 0.85;
     
      const KwH = ((Amp1 * Volt * PF) / 1000).toFixed(2);
     
      // console.log(KwH)
      return KwH;
    }
     
    CalculateKwHP2(){
      const Amp2 = parseFloat(this.dataEl.PhaseCurrent2);
     
     
      const Volt = parseFloat(this.dataEl.PhaseVoltage2);
      const PF = 0.85;
     
      const KwH = ((Amp2 * Volt * PF) / 1000).toFixed(2);
     
      // console.log(KwH)
      return KwH;
    }
     
    CalculateKwHP3(){
      const Amp3 = parseFloat(this.dataEl.PhaseCurrent3);
     
      const Volt = parseFloat(this.dataEl.PhaseVoltage3);
      const PF = 0.85;
     
      const KwH = ((Amp3 * Volt * PF) / 1000).toFixed(2);
     
      // console.log(KwH)
      return KwH;
    }
     
     
    AddNewHistory(){
      this.History.push({Date: new Date(), Kwh:this.CalculateTotalKwh()})
      console.log()
    }
     
    dataPoints:any[] = [];
      timeout:any = null;
      xValue:number = 1;
      yValue:number = 1;
      newDataCount:number = 10;
      chart: any;
     
      chartOptions = {
        theme: "light1",
        title: {
          text: "Live Data"
        },
        data: [{
          type: "line",
          dataPoints: this.dataPoints
        }]
      }
     
     
      getChartInstance(chart: object) {
        this.chart = chart;
        this.updateData();
      }
     
      ngOnDestroy() {
        clearTimeout(this.timeout);
      }
     
      updateData = () => {
        // this.http.get(""+this.xValue+"&ystart="+this.yValue+"&length="+this.newDataCount);
        this.newDataCount = 10;
        this.addData(this.History)
      }
     
      addData = (data:any) => {
        if(this.newDataCount != 1) {
          let lastElement = data.pop()
          this.dataPoints.push({x: lastElement.Date, y: parseFloat(lastElement.Kwh)});
          this.xValue++;
          this.yValue = parseInt(lastElement.Kwh)
          console.log(lastElement)
        } 
        this.newDataCount = 1;
        this.chart.render();
        this.timeout = setTimeout(this.updateData, 10000);
      }
    
      checkMaxKwH(){
        if((this.MaxKwH * 0.9) < parseFloat(this.CalculateTotalKwh()) && this.MaxKwH > parseFloat(this.CalculateTotalKwh())){
          this.snackBar.open('OBS! Du börjar närma dig din satta Max Kw/h!', '⚠️', {duration: 8000});
        }
        else if(this.MaxKwH < parseFloat(this.CalculateTotalKwh()))
        {
          this.snackBar.open('OBS! Totala KwH överskrider din satta Kw/h', '❗', {duration: 8000});
        }
        
      }
    
      setMaxKwH(KwhInput:any){
        this.MaxKwH = KwhInput;
        console.log(this.MaxKwH)
        return this.MaxKwH;
      }
    }

