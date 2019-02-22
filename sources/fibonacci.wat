(module
	(export "fibonacci" (func $fibonacci))
	(func $fibonacci (param $number f64) (result f64)
		(local $a f64) 
		(local $b f64)
		(local $temp f64)

		f64.const 1
		set_local $a

		f64.const 0
		set_local $b

		loop $loop
			get_local $number
			f64.const 0
			f64.gt
			if $loopIf
				get_local $a
				set_local $temp

				get_local $a
				get_local $b
				f64.add
				set_local $a

				get_local $temp
				set_local $b

				get_local $number
				f64.const 1
				f64.sub
				set_local $number

				br $loop
			end $loopIf
		end $loop

		get_local $b
	)
)