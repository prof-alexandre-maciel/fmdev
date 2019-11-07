// Angular
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// NgBootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// Core Module
import { CoreModule } from '../../../core/core.module';
import { PartialsModule } from '../../partials/partials.module';
import { DashboardComponent } from './dashboard.component';
import { PlotlyModule } from 'angular-plotly.js';
import { MatSelectModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

@NgModule({
	imports: [
		CommonModule,
		PartialsModule,
		CoreModule,
		NgbModule,
		PlotlyModule,
		MatSelectModule,
		FormsModule,
		RouterModule.forChild([
			{
				path: '',
				component: DashboardComponent
			},
		]),
	],
	providers: [],
	declarations: [
		DashboardComponent,
	]
})
export class DashboardModule {
}
