// composables/states.ts
import { useState } from '#app'

export const usePageTitle = () => useState<string>('page-title', () => 'Электронное пособие')