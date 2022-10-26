import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { SampleComponent } from 'app/modules/admin/sample/sample.component';

const sampleRoutes: Route[] = [
    {
        path: '',
        component: SampleComponent
    }
];

@NgModule({
    declarations: [
        SampleComponent
    ],
    imports: [
        RouterModule.forChild(sampleRoutes),
        CommonModule,
        TranslocoModule
    ]
})
export class SampleModule {
}
