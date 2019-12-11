import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
import { Router, NavigationEnd } from '@angular/router';
export const mainRoutes = [
  {
    path: 'dashboard',
    name: 'Dashboard',
    url: './dashboard'
  },
  {
    path: 'search-patient',
    name: 'Search patient',
    url: './search-patient'
  },
  {
    path: 'user-manangement',
    name: 'User Management',
    url: './user-manangement'
  },
  {
    path: 'patient',
    name: 'Manage Patient',
    url: './patient',
    children: [
      {
        path: 'add-patient',
        name: 'Add Patient',
        url: './patient/add-patient'
      },
      {
        path: 'add-dependent',
        name: 'Add Dependent',
        url: './patient/add-dependent'
      },
      {
        path: 'edit-patient',
        name: 'Edit Patient',
        url: './patient/edit-patient'
      },
      {
        path: 'child-registration',
        name: 'Child Registration',
        url: './patient/child-registration'
      },
      {
        path: 'child-milestone',
        name: 'Child Milestone',
        url: './patient/child-milestone'
      }
    ]
  },
  {
    path: 'add-appointment',
    name: 'Add Appointment',
    url: './add-appointment'
  },
  {
    path: 'vital-data',
    name: 'Vital Section',
    url: './vital-data',
    children: [
      {
        path: 'add-clinical-data',
        name: 'Add Clinical Data',
        url: './vital-data/add-clinical-data'
      },
      {
        path: 'clinical-data',
        name: 'View Clinical Data',
        url: './vital-data/clinical-data'
      },
    ]
  },
  {
    path: 'inference',
    name: 'Treatment',
    url: './inference',
    children: [
      {
        path: 'gp-inference',
        name: 'GP Inference',
        url: './inference/gp-inference'
      },
      {
        path: 'eye-inference',
        name: 'Eye Inference',
        url: './inference/eye-inference'
      },
      {
        path: 'dental-inference',
        name: 'Dental Inference',
        url: './inference/dental-inference'
      },
    ]
  },
  {
    path: 'write-prescription',
    name: 'Write Prescription',
    url: './write-prescription'
  },
  {
    path: 'diagnostic-service',
    name: 'Diagnostic Services Ordering',
    url: './diagnostic-service'
  },
  {
    path: 'report',
    name: 'Reports',
    url: './report',
    children: [
      {
        path: 'mis-report',
        name: 'MIS Report',
        url: './report/mis-report'
      },
      {
        path: 'appointment-report',
        name: 'Appointment Report',
        url: './report/appointment-report'
      },
      {
        path: 'patient-report',
        name: 'Patient Report',
        url: './report/patient-report'
      },
    ]
  },
  {
    path: 'services',
    name: 'Services',
    url: './services',
    children: [
      {
        path: 'file-upload',
        name: 'File Upload',
        url: './services/file-upload'
      },
      {
        path: 'audiology',
        name: 'Audiology',
        url: './services/audiology'
      }
    ]
  },
  {
    path: 'vendor-services',
    name: 'Vendor Services',
    url: './vendor-services',
    children: [
      {
        path: 'clinical-supply',
        name: 'Clinical Supply',
        url: './vendor-services/clinical-supply'
      },
      {
        path: 'hospital-supply',
        name: 'Hospital Supply',
        url: './vendor-services/hospital-supply'
      }
    ]
  },
  {
    path: 'home-services',
    name: 'Home Services',
    url: './home-services'
  },
  {
    path: 'advocacy',
    name: 'Advocacy',
    url: './advocacy'
  }
];
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  initdata: any = { today: new Date(), pages: [], options: { top: 0, bottom: 0 } };
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  constructor(private breakpointObserver: BreakpointObserver, private router: Router) { }
  ngOnInit() {
    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationEnd && !event.url.includes('login')) {
          this.initdata.userName = 'BalinJ Admin'
          this.getMenu();
          this.getHeader();
        }
      });
  }
  getMenu() {
    this.initdata.pages = _.reject(mainRoutes, ['name', null]);
  }
  getHeader() {
    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.header(event.url);
        } else {
          this.header(location.pathname);
        }
      });
  }
  header(url) {
    this.initdata.subHeader = '';
    const header: any = _.find(this.initdata.pages, ['path', url.split('/')[1]]);
    if (header) {
      this.initdata.header = header.name;
    }
    if (header && header.children && _.find(header.children, ['path', url.split('/')[2]])) {
      const subHeader: any = _.find(header.children, ['path', url.split('/')[2]]);
      this.initdata.subHeader = ' - ' + subHeader.name;
    }
  }
  loginDialog(index) {
    // this.loginPopupService.openLoginDialog(index);
  }

  logout() {
    this.initdata.userName = null;
    this.router.navigate(['/login']);
    // this.loginService.logout();
  }
}
