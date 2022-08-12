import Validator, { Rules } from "validatorjs";

export function validate(data: Object, rules: Rules) {
	let valid = new Validator(data, rules);

	if (valid.fails()) return [false, valid.errors.all()];
	else return [true, valid.input];
}
