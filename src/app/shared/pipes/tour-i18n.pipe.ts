import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

/**
 * Resolves tour body copy from i18n (`tourContent.{filecode}.{path}`),
 * falling back to the English source string when a key is missing.
 */
@Pipe({
  name: 'tourI18n',
  standalone: true,
  pure: false,
})
export class TourI18nPipe implements PipeTransform {
  constructor(private readonly translate: TranslateService) {}

  transform(
    fallback: string | null | undefined,
    filecode: string | null | undefined,
    path: string,
  ): string {
    const english = fallback ?? '';
    if (!filecode || !path) {
      return english;
    }

    const key = `tourContent.${filecode}.${path}`;
    const value = this.translate.instant(key);
    if (typeof value !== 'string' || !value || value === key) {
      return english;
    }
    return value;
  }
}
