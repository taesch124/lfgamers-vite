
export default class NavigationService {
    public static redirect = (to: string): void | Promise<void> => {
        window.location.href = to;
    }
}