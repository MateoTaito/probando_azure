import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo} from "sequelize-typescript";
import Paciente from "./Paciente.model";

@Table({
	tableName: "Consultas",
})
class Consulta extends Model {
	
    @PrimaryKey
	@AutoIncrement
	@Column({ 
		type: DataType.INTEGER,
	})
	declare Id: number;

	@Column({
		type: DataType.STRING,
	})
	declare fechaConsulta: string;

	@Column({
		type: DataType.STRING,
	})
	declare horaConsulta: string;

	@Column({
		type: DataType.STRING,
	})
	declare medico_tratante: string;

    @Column({
		type: DataType.INTEGER,
	})
	declare nro_clinica: number;

    @ForeignKey(()=> Paciente)
	@Column({
		type: DataType.STRING,
	})
	declare Paciente_Rut: string;

	@BelongsTo(() => Paciente)
	declare PacienteRut: Paciente;
}

export default Consulta;
