#!/bin/sh

multitail -Z ,,inverse -s 2 -m 0 -cT ANSI -n 100 "log/development.log" -m 0 -cT ANSI -n 100 "log/test.log"
