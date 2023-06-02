export interface IPosition {
  position: [number, number];
  locationOfTheRestaurant: string;
  adressOfTheRestaurant: string;
}

export interface IPostDish {
  id: string;
  imgSrc: string;
  altImg: string;
  title: string;
  price: any;
}

export interface IUser {
  name?: string;
  email: string | null;
  isActivated: boolean;
  id: string | null;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

export interface ILoginUser {
  loginUser: {
    error: any;
    userInfo: AuthResponse;
  };
}

export interface IAuthedUser {
  authUser: {
    isAuth: boolean;
  };
}

export interface ILoginOpened {
  isOpened: boolean;
}

export interface IRegistrationOpened {
  isOpened: boolean;
}

export interface ISuccessfullWindowOpened {
  isOpened: boolean;
}

export interface IRegistrationCompleted {
  isOpened: boolean;
}

export interface IRegistrationCompleteWindow {
  registrationCompletedWindow: {
    isOpened: boolean;
  };
}

export interface IErrorWindowOpened {
  isOpened: boolean;
}

export interface ILoading {
  isOpened: boolean;
}

export interface ILogin {
  loginForm: {
    isOpened: boolean;
  };
}

export interface IRegistration {
  registrationForm: {
    isOpened: boolean;
  };
}

export interface IAuthUser {
  userInfo?: IUser;
  isAuth?: boolean;
  error?: any;
}

export interface IDish {
  _id?: string;
  category?: string;
  imgSrc: string;
  altImg: string;
  title: string;
  price: string;
  headline?: string;
  id: string;
  _v?: number;
}

export interface IDishCart {
  _id: string;
  id: string;
  headline: string;
  category?: string;
  imgSrc: string;
  altImg: string;
  title: string;
  price: string;
  _v?: number;
}

export interface IDishData {
  dishesData: {
    dishesAllInfo: {
      dishes: IDish[];
      error: any;
      limit: number;
      page: number;
      total: number;
    };
  };
}

export interface IDishAllInfo {
  dishesAllInfo: {
    dishes: IDish[];
    error: any;
    limit: number;
    page: number;
    total: number;
  };
}

export interface IAllIdDishes {
  [key: string]: number;
}

export interface IDishesInCart {
  cart: {
    dishes: IAllIdDishes;
    error: any;
  };
}

export interface ISearchValue {
  search: {
    value: string;
  };
}

export interface ICart {
  dishes: any;
  error: any;
}

export interface IAllDishesId {
  cart: {
    dishes: IAllIdDishes;
    error: any;
  };
}

export interface IAllDishes {
  allDishes: {
    dishes: IDish[];
    error: any;
  };
}

export interface ISuccessModal {
  successfullWindow: {
    isOpened: boolean;
  };
}

export interface IErrorModal {
  errorWindow: {
    isOpened: boolean;
  };
}

export interface IOrderedDishInfo {
  price: string;
  quantity: number;
  title: string;
}

export interface ILoginError {
  loginUser: {
    error: any;
    userInfo: IUser;
  };
}

export interface ILoadingOpened {
  loading: {
    isOpened: boolean;
  };
}

export interface IRegistrationError {
  registrationUser: {
    error: any;
    userInfo: IUser;
  };
}

export interface IAllDishesLoader {
  allDishesLoader: {
    isOpened: boolean;
  };
}
