(module
	(import "env" "memory" (memory $memory 1))
	(export "linearSearch" (func $linearSearch))
	(export "fastlinearSearch" (func $fastlinearSearch))
	(func $fastlinearSearch (param $end i32) (param $number f64) (result i32)
		(local $address i32)
		(local $result i32)

		get_local $end
		i32.const 1
		i32.add
		i32.const 8
		i32.mul
		tee_local $end

		get_local $number
		f64.store

		loop $rangeLoop
			get_local $address
			f64.load
			get_local $number
			f64.eq
			if $check
				get_local $address
				set_local $result
			else
				get_local $address
				i32.const 8
				i32.add
				set_local $address
				br $rangeLoop
			end $check
		end $rangeLoop

		get_local $result
		get_local $end
		i32.eq
		if (result i32)
			i32.const -1
		else
			get_local $result
			i32.const 8
			i32.div_s
		end
	)
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