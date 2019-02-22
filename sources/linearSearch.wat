(module
	(import "env" "memory" (memory $memory 10))
	(export "linearSearch" (func $linearSearch))
	(func $linearSearch (param $end i32) (param $number f64) (result i32)
		(local $address i32)
		(local $result i32)

		get_local $end
		i32.const 8
		i32.mul
		set_local $end

		i32.const -1
		set_local $result

		loop $rangeLoop
			get_local $address
			get_local $end
			i32.le_s
			if $loopIf
				get_local $address
				f64.load
				get_local $number
				f64.eq
				if $check
					get_local $address
					i32.const 8
					i32.div_s
					set_local $result
				else
					get_local $address
					i32.const 8
					i32.add
					set_local $address
					br $rangeLoop
				end $check
			end $loopIf
		end $rangeLoop

		get_local $result
	)
)