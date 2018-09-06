import { query } from '../configurations/DatabaseConfigurations';

interface ILogin {
  // return typings:
  id: number,
  user: string,
  password: string,
  email: string,
  levels: string,
  token:number,
  language: string;

}

export const FindUser = async ({
  // params deconstructor:
  user,
}: {
  // params typings:
  user: string;
}): Promise<ILogin[]> => {
  const response: ILogin[] = await query(`select e.id,e.user,e.name,e.language, e.password, e.email,e.token,e.idProfile, (select group_concat(idPermission separator ',') from Items_Profile where idProfile = e.idProfile) 
  as levels from User as e where e.user like ? `, [user]);
   return response;
  // OR
  // using Type variable as described on typescript docs
  // already implemented on query function:
  //
  // return query<IFindUserRow[]>('SELECT email, password ,token FROM users where email = ?', [email]);

}

export const FindUserByEmail = async ({
  // params deconstructor:
  email,
}: {
  // params typings:
  email: string;
}): Promise<ILogin[]> => {
  const response: ILogin[] = await query(`select e.id, e.password, e.email,e.idProfile from User as e where e.email like ? `, [email]);
   return response;
  // OR
  // using Type variable as described on typescript docs
  // already implemented on query function:
  //
  // return query<IFindUserRow[]>('SELECT email, password ,token FROM users where email = ?', [email]);

}

export const FindUserByUser = async ({
  // params deconstructor:
  user,
}: {
  // params typings:
  user: string;
}): Promise<ILogin[]> => {
  const response: ILogin[] = await query(`select e.id, e.password, e.email,e.idProfile from User as e where e.user like ? `, [user]);
   return response;
  // OR
  // using Type variable as described on typescript docs
  // already implemented on query function:
  //
  // return query<IFindUserRow[]>('SELECT email, password ,token FROM users where email = ?', [email]);

}


interface FindUserById {
  // return typings:
  id: number,
  name:string,
  phoneNumber: string,
  email: string,
  office: string,
  dt_Birth: string,
  dt_Admission: string,
  dt_Resignation?: any,
  status: string,
  sector: string,
  user: string,
  password: string,
  salary: number,
  notes?: string
  idProfile: number,
  deficiency?: string,
  document: string,
  address: string,
  photo?: string;

}

export const FindUserById = async ({
  // params deconstructor:
  id,
}: {
  // params typings:
  id: number;
}): Promise<FindUserById[]> => {
  const response: FindUserById[] = await query(`SELECT id,  name,  phoneNumber,  email,  office,  dt_Birth,  dt_Admission,  dt_Resignation,  status,
  sector,  user,  password,  salary/100 as salary,  notes,  idProfile,  deficiency,  document,  address, photo FROM User where id = ? `, [id]);
   return response;
  // OR
  // using Type variable as described on typescript docs
  // already implemented on query function:
  //
  // return query<IFindUserRow[]>('SELECT email, password ,token FROM users where email = ?', [email]);

}


interface InsertUser {
  // return typings:
  

}

export const InsertUser = async ({
  // params deconstructor:
  name,
  phoneNumber,
  email,
  office,
  dt_Birth,
  dt_Admission,
  dt_Resignation,
  status,
  sector,
  user,
  password,
  salary,
  notes,
  idProfile,
  deficiency,
  document,
  address,
  photo
}: {
  // params typings:
  name:string
  phoneNumber: string,
  email: string,
  office: string,
  dt_Birth: string,
  dt_Admission: string,
  dt_Resignation?: string,
  status: string,
  sector: string,
  user: string,
  password: string,
  salary: number,
  notes?: string
  idProfile: number,
  deficiency?: string,
  document: string,
  address: string,
  photo?: string
}): Promise<InsertUser[]> => {
  const response: InsertUser[] = await query(`insert into User (name,phoneNumber,email,office,dt_Birth,dt_Admission,dt_Resignation,status,sector,user,password,salary,
    notes,idProfile,deficiency,document,address, photo) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) `, [name,phoneNumber,email,office,dt_Birth,dt_Admission,dt_Resignation,status,sector,user,password,salary,
      notes,idProfile,deficiency,document,address, photo]);
   return response;

}


interface UpdateUser {
  // return typings:
  

}

export const UpdateUser = async ({
  // params deconstructor:
  name,
  phoneNumber,
  email,
  office,
  dt_Birth,
  dt_Admission,
  dt_Resignation,
  status,
  sector,
  user,
  salary,
  notes,
  idProfile,
  deficiency,
  document,
  address,
  photo,
  id
}: {
  // params typings:
  name:string
  phoneNumber: string,
  email: string,
  office: string,
  dt_Birth: string,
  dt_Admission: string,
  dt_Resignation?: string,
  status: string,
  sector: string,
  user: string,
  salary: number,
  notes?: string
  idProfile: number,
  deficiency?: string,
  document: string,
  address: string,
  photo?: string
  id: number
}): Promise<UpdateUser[]> => {
  const response: UpdateUser[] = await query(` update User
  set
  name = ?,
  phoneNumber = ?,
  email = ?,
  office = ?,
  dt_Birth = ?,
  dt_Admission = ?,
  dt_Resignation = ?,
  status = ?,
  sector = ?,
  user = ?,
  salary = ?,
  notes = ?,
  idProfile = ?,
  deficiency = ?,
  document = ?,
  address = ?,
  photo = ?
  where id = ? `, [name,phoneNumber,email,office,dt_Birth,dt_Admission,dt_Resignation,status,sector,user,salary,notes,idProfile,deficiency,document,address, photo, id]);
     
  return response;




}


interface AllUsers {
  // return typings:
  id: number,
  name:string,
  phoneNumber: string,
  email: string,
  office: string,
  dt_Birth: string,
  dt_Admission: string,
  dt_Resignation?: string,
  status: string,
  sector: string,
  user: string,
  password: string,
  salary: number,
  notes?: string
  idProfile: number,
  deficiency?: string,
  document: string,
  address: string,
  photo?: string;
  
}

export const AllUsers = async (

): Promise<AllUsers[]> => {
  const response: AllUsers[] = await query(`SELECT id,  name,  phoneNumber,  email,  office,  dt_Birth,  dt_Admission,  dt_Resignation,  status,
  sector,  user,  password,  salary/100 as salary,  notes,  idProfile,  deficiency,  document,  address, photo FROM User `, []);
   return response;
  // OR
  // using Type variable as described on typescript docs
  // already implemented on query function:
  //
  // return query<IFindUserRow[]>('SELECT email, password ,token FROM users where email = ?', [email]);

}




interface InsertUserToken {
  // return typings:
  
}

export const insertToken = async ({
  // params deconstructor:
  token,
  id,
}: {
  // params typings:
  token: number,
  id: number
}): Promise<InsertUserToken[]> => {
  const response: InsertUserToken[] = await query(`update User set token = ? where id = ? `, [token,id]);
   return response;
  // OR
  // using Type variable as described on typescript docs
  // already implemented on query function:
  //
  // return query<IFindUserRow[]>('SELECT email, password ,token FROM users where email = ?', [email]);

}