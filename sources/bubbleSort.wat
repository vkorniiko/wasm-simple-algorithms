(module
	(import "env" "memory" (memory $memory 10))
	(export "bubbleSort" (func $bubbleSort))
	(func $bubbleSort (param $start i32) (param $end i32)
		(local $swapped i32) 
		(local $idx1 i32)
		(local $idx2 i32)
		(local $value1 f64)
		(local $value2 f64)

		get_local $start
		i32.const 8
		i32.mul
		set_local $start

		get_local $end
		i32.const 8
		i32.mul
		set_local $end

		loop $outerLoop
			i32.const 0
			set_local $swapped

			get_local $start
			set_local $idx1

				loop $innerLoop
					get_local $idx1
					get_local $end
					i32.lt_s
					if $innerIf
						get_local $idx1
						f64.load
						tee_local $value1

						get_local $idx1
						i32.const 8
						i32.add
						tee_local $idx2
						f64.load
						tee_local $value2

						f64.gt
						if $swapIf
							get_local $idx1
							get_local $value2
							f64.store

							get_local $idx2
							get_local $value1
							f64.store

							i32.const 1
							set_local $swapped
						end $swapIf

						get_local $idx1
						i32.const 8
						i32.add
						set_local $idx1

						br $innerLoop
					end $innerIf
				end $innerLoop

			get_local $swapped
			br_if $outerLoop

		end $outerLoop
	)
)