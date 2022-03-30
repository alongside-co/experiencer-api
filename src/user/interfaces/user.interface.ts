export class User {
  id: number;
  email: {
    kakao?: string;
    naver?: string;
  };
  username: string;
  password: string;
}
