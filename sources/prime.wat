(module
	(import "env" "memory" (memory $memory 1))
	(export "isPrime" (func $isPrime))
	(export "sieve" (func $sieve))
	(func $sieve (param $count i32)
		(local $number i32)
		(local $mulNumber i32)
		(local $limit i32)

		get_local $count
		f32.convert_u/i32
		f32.sqrt
		i32.trunc_u/f32
		set_local $limit

		i32.const 2
		set_local $number
		
		loop $initLoop
			get_local $number
			get_local $count
			i32.lt_s
			if $loopIf
				get_local $number
				i32.const 1
				i32.store8

				get_local $number
				i32.const 1
				i32.add
				set_local $number

				br $initLoop
			end $loopIf
		end $initLoop

		i32.const 2
		set_local $number
		
		loop $mainLoop
			get_local $number
			get_local $limit
			i32.le_s
			if $loopIf

				get_local $number
				i32.load8_s
				i32.const 1
				i32.eq
				if $checkIf
					get_local $number
					get_local $number
					i32.mul
					set_local $mulNumber
					
					loop $sieveLoop
						get_local $mulNumber
						get_local $count
						i32.le_u
						if $mulCheckIf
							get_local $mulNumber
							i32.const 0
							i32.store8

							get_local $number
							get_local $mulNumber
							i32.add
							set_local $mulNumber

							br $sieveLoop
						end $mulCheckIf
					end $sieveLoop
				end $checkIf

				get_local $number
				i32.const 1
				i32.add
				set_local $number

				br $mainLoop
			end $loopIf
		end $mainLoop
	)
	(func $isPrime (param $number_f f64) (result i32)
		(local $result i32) 
		(local $idx i64)
		(local $number i64)

		get_local $number_f
		i64.trunc_u/f64
		set_local $number

		get_local $number
		i64.const 1
		i64.gt_s
		set_local $result

		i64.const 2
		set_local $idx

		loop $loop
			get_local $idx
			get_local $number
			i64.lt_s
			if $loopIf
				get_local $number
				get_local $idx
				i64.rem_u
				i64.eqz
				if $check
					i32.const 0
					set_local $result
				else
					get_local $idx
					i64.const 1
					i64.add
					set_local $idx

					br $loop
				end $check
			end $loopIf
		end $loop

		get_local $result
	)
)