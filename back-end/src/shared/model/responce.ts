interface ResponseEntityParams<T> {
    error?: string;
    status?: number;
    data?: T;
}

export class ResponseEntity<T> {
    error?: string;
    data?: T;

    constructor(params: ResponseEntityParams<T> = {}) {
        this.error = params.error || null;
        this.data = params.data;
    }
}

