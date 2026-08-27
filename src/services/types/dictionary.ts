export type DictionaryResponse = {
    id: number,
    original_word: string;
    mean: string;
    created_at: string,
    updated_at: string,
}

export interface DictionaryStoreDto {
    original_word: string;
    mean: string;
}

export interface DictionaryUpdateDto {
    original_word: string;
    mean: string;
}
