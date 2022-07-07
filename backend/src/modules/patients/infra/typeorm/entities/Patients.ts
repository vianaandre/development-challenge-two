import {
  Column,
  Entity,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { Address } from "./Address";

@Entity("patients")
class Patients {
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @Column()
  birth_date: Date;

  @Column()
  email: string;

  @OneToOne(() => Address, (address) => address.id)
  @JoinColumn({ name: "address_id" })
  address: Address;

  @Column()
  address_id: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { Patients };
