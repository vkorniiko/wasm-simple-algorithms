(module
	(export "factorial" (func $factorial))
	(func $factorial (param $number f64) (result f64)
		(local $result f64)
		(local $idx f64)

		f64.const 2
		set_local $idx

		f64.const 1
		set_local $result

		loop $rangeLoop
			get_local $idx
			get_local $number
			f64.le
			if $loopIf
				get_local $result
				get_local $idx
				f64.mul
				set_local $result

				get_local $idx
				f64.const 1
				f64.add
				set_local $idx

				br $rangeLoop
			end $loopIf
		end $rangeLoop

		get_local $result
	)
)