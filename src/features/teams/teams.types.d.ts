export interface IUser {
  id: string | number;
  email: string;
  name: string;
}

export interface ITeams {
  id?: string | number;
  name: string;
  title: string;
  color: string;
  members: IUser[];
}
export interface IteamState {
  teams: ITeams[] | undefined;
}
