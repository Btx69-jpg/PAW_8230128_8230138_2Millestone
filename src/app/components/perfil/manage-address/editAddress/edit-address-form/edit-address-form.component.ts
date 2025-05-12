import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from 'express';
import { AddresOrderService } from '../../../../../services/address/addres-order.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-edit-user-form',
   imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './edit-user-form.component.html',
  styleUrl: './edit-user-form.component.css'
})
export class EditAddressFormComponent {
  addressForm!: FormGroup;
  userId!: string;
  addressId!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private addressService: AddresOrderService
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['userId'];
    this.addressId = this.route.snapshot.params['addressId'];

    this.addressForm = this.fb.group({
      nif: ['', Validators.min(100000000), Validators.max(999999999)],
      street: ['', Validators.required],
      postal_code: ['', Validators.required],
      city: ['', Validators.required]
    });

    this.loadAddressData();
  }

  loadAddressData() {
    
  }

  update() {
    
  }
}
