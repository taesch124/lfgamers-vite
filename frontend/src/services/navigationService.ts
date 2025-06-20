import { type NavigateFunction } from 'react-router';

export default class NavigationService {
    private static navigate: NavigateFunction;
    
    public static setNavigate(navigate: NavigateFunction) {
        NavigationService.navigate = navigate;
    }

    public static getNavigate = (): NavigateFunction => NavigationService.navigate;
}