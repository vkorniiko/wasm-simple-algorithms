(module
	(import "env" "memory" (memory $memory 1))
	(export "interpolationSearch" (func $interpolationSearch))
	(func $interpolationSearch (param $end i32) (param $number f64) (result i32)
		(local $middle i32)
		(local $value f64)
		(local $address i32)
		(local $start i32)
		(local $startValue f64)
		(local $endValue f64)
		(local $middleValue f64)
		(local $rangeDelta f64)
		(local $result i32)

		i32.const -1
		set_local $result

		loop $rangeLoop
			get_local $start
			i32.const 8
			i32.mul
			f64.load
			set_local $startValue

			get_local $end
			i32.const 8
			i32.mul
			f64.load
			set_local $endValue

			get_local $start
			get_local $end
			i32.le_s
			if
			get_local $startValue
			get_local $number
			f64.le
			if
			get_local $endValue
			get_local $number
			f64.ge
			if
				get_local $endValue
				get_local $startValue
				f64.sub
				tee_local $rangeDelta

				f64.const 0
				f64.ne
				if
					get_local $end 
					get_local $start
					i32.sub
					f64.convert_s/i32
					get_local $rangeDelta
					f64.div
					get_local $number
					get_local $startValue
					f64.sub
					f64.mul
					i32.trunc_s/f64
					get_local $start
					i32.add
					tee_local $middle
					i32.const 8
					i32.mul
					f64.load
					tee_local $middleValue

					get_local $number
					f64.eq
					if $checkIf
						get_local $middle
						set_local $result
					else
						get_local $middleValue
						get_local $number
						f64.lt
						if 
							get_local $middle
							i32.const 1
							i32.add
							set_local $start
						else
							get_local $middle
							i32.const 1
							i32.sub
							set_local $end
						end

						br $rangeLoop
					end
				else
					get_local $startValue
					get_local $number
					f64.eq
					if (result i32)
						get_local $start
					else
						i32.const -1
					end

					set_local $result
				end
			end
			end
			end
		end $rangeLoop

		get_local $result
	)
)