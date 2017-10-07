import {Component, OnDestroy, OnInit} from '@angular/core';

import {Subscription} from 'rxjs/Subscription';

import {Principal} from '../../shared/auth/principal.service';
import {ResponseWrapper} from '../../shared/model/response-wrapper.model';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {Appointment} from './appointments.model';
import {AppointmentsService} from './appointments.service';

@Component({
    selector: 'jhi-patient-appointments',
    templateUrl: './appointments.component.html',
    styleUrls: ['./appointments.css']
})
export class AppointmentsComponent implements OnInit, OnDestroy {
    appointments: Appointment[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(private appointmentService: AppointmentsService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.appointmentService.query().subscribe(
            (res: ResponseWrapper) => {
                this.appointments = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInAppointments();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Appointment) {
        return item.id;
    }
    registerChangeInAppointments() {
        this.eventSubscriber = this.eventManager.subscribe('appointmentListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
