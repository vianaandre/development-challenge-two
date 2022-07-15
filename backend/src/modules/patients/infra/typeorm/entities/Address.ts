import { Column, Entity, PrimaryColumn, CreateDateColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("address")
class Address {
  @PrimaryColumn()
  id?: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  postcode: string;

  @Column()
  number: number;

  @Column()
  neighborhood: string;

  @Column()
  district: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { Address };
