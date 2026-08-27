declare const Goftino: {
    getUserId: () => string | null;
    setUserId: (token: string) => void;
    setUser: (user: {
        name?: string;
        email?: string;
        about?: string;
        phone?: string;
        forceUpdate?: boolean;
    }) => void;
};
