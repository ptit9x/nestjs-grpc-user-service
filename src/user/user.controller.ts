import { Controller } from '@nestjs/common';
import {
  GrpcMethod,
  GrpcStreamMethod,
} from '@nestjs/microservices';
import { Observable, Subject } from 'rxjs';
import { UserByIdInterface } from './interfaces/user-by-id.interface';
import { UserInterface } from './interfaces/user.interface';
import { USER_SERVICE_NAME } from './user.pb';

@Controller()
export class UserController {
  private readonly items: UserInterface[] = [
    { id: 1, name: 'Huynh' },
    { id: 2, name: 'dn' },
  ];

  @GrpcMethod(USER_SERVICE_NAME, 'FindOne')
  findOne(data: UserByIdInterface): UserInterface {
    return this.items.find(({ id }) => id === data.id);
  }

  @GrpcStreamMethod(USER_SERVICE_NAME, 'FindMany')
  findMany(data$: Observable<UserByIdInterface>): Observable<UserInterface> {
    const hero$ = new Subject<UserInterface>();

    const onNext = (heroById: UserByIdInterface) => {
      const item = this.items.find(({ id }) => id === heroById.id);
      hero$.next(item);
    };
    const onComplete = () => hero$.complete();
    data$.subscribe({
      next: onNext,
      complete: onComplete,
    });

    return hero$.asObservable();
  }
}
