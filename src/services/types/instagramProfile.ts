export type InstagramProfileResponse = {
    name: string;
    url: string;
    username: string;
    bio: string | null;
    avatar: string | null;
};

export type InstagramProfileUpdateDto = {
    name: string;
    url: string;
    bio: string | null;
    avatar: File | null;
    remove_avatar: boolean;
};
