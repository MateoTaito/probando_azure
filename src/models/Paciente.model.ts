import { Table, Column, Model, DataType, PrimaryKey} from "sequelize-typescript";

@Table({
	tableName: "Pacientes",
})
class Paciente extends Model {
	
	@PrimaryKey
	@Column({
		type: DataType.STRING,
	})
	declare Rut: string;

	@Column({
		type: DataType.STRING,
	})
	declare Dirección: string;

	@Column({
		type: DataType.STRING,
	})
	declare Nombre: string;

    @Column({
		type: DataType.INTEGER,
	})
	declare Telefono: number;
}

export default Paciente;
