import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgApexchartsModule } from 'ng-apexcharts';
import { TranslocoModule } from '@ngneat/transloco';
import { HomeComponent } from 'app/modules/admin/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';

const homeRoutes: Route[] = [
    {
        path: '',
        component: HomeComponent
    }
];

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        RouterModule.forChild(homeRoutes),
        CommonModule,
        TranslocoModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        MatProgressBarModule,
        MatSortModule,
        MatTableModule,
        MatTooltipModule,
        NgApexchartsModule,
    ]
})
export class HomeModule {
}
