.data


.text
	
	addi	$t1,$zero,5
	addi	$t2,$zero,9
	add	$t0, $t1, $t2
	
	li 	$v0, 1
	move 	$a0, $t0
	syscall