export default interface Repository<T> {

    insert(entity: T): T;

}