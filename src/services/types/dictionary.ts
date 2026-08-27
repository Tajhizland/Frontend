import {Identified, Timestamps} from "@/services/http";
export interface DictionaryBase {
    original_word: string;
    mean: string;
}

export interface DictionaryResponse extends DictionaryBase, Identified, Timestamps {}

export interface DictionaryStoreDto extends DictionaryBase {}

export type DictionaryUpdateDto = DictionaryStoreDto;
