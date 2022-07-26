import { Injectable } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ConversorService {

  constructor(private sanitizer: DomSanitizer) { }

  public extraerBase64 = async ($event: any) => new Promise((resolve): any => {
    try {
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };

    } catch (e) {
      return null;
    }
  });

  public safeResourceUrl(url: string): SafeResourceUrl{
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
