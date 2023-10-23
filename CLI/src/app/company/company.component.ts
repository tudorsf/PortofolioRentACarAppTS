import { Component, OnInit  } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Company } from '../models/BL/company.model';
import { CompanyService } from '../services/company.service';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  profile: Company = {
    id: 0,
    userREF: 0,
    name: '',
    city: '',
    rating: 0,
    cars: []
  }


  constructor(private authService: AuthService, private companyService: CompanyService) {
    this.companyService.getProfile().subscribe((data: any) => {
        
      this.profile = data;        
      console.log(this.profile);
      

    });
    

    
   }

  ngOnInit(): void {
    
  }

  

}
