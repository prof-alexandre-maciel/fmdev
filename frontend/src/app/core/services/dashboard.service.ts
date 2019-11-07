import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { HttpUtilsService } from '../_base/crud';

const BASE_URL = `${environment.baseUrl}`;

@Injectable()
export class DashboardService {
	constructor(private http: HttpClient, private httpUtils: HttpUtilsService) { }

	listsBoxplots(filter) {
		const options = this.httpUtils.getHTTPHeaders();

		return this.http.post(`${BASE_URL}/boxplot`, filter, { headers: options }).toPromise();
	}

	listScatterplots(filter) {
		const options = this.httpUtils.getHTTPHeaders();

		return this.http.post(`${BASE_URL}/scatterplot`, filter, { headers: options }).toPromise();
	}

	listGraphLabels() {
		const options = this.httpUtils.getHTTPHeaders();

		return this.http.get(`${BASE_URL}/data-frame-labels`, { headers: options }).toPromise();
	}

	create(data) {
		const httpHeaders = this.httpUtils.getHTTPHeaders();

		return this.http.post(BASE_URL, data, { headers: httpHeaders }).toPromise();
	}

	listAll() {
		const options = this.httpUtils.getHTTPHeaders();

		return this.http.get(BASE_URL, { headers: options }).toPromise();
	}

	update(customer) {
		const httpHeader = this.httpUtils.getHTTPHeaders();
		return this.http.put(`${BASE_URL}/${customer.id}`, customer, { headers: httpHeader }).toPromise();
	}

	destroy(customerId: number) {
		const url = `${BASE_URL}/${customerId}`;
		return this.http.delete(url);
	}

}
