export interface ReflectMetadata {
  getMetadata(key: string, target: any, propertyKey: any): any;
}
